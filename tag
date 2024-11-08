#!/bin/bash

# Variables
VERSION_FILE="version"
PROD=false  # By default, use staging
INCREMENT="patch"  # Default increment is patch

# Function to handle errors
handle_error() {
    echo "[ERROR] $1"
    exit 1
}

# Function to read the current version from the version file
read_version() {
    if [ ! -f "$VERSION_FILE" ]; then
        echo "[INFO] No version file found. Starting from 0.0.0."
        echo "0.0.0" > "$VERSION_FILE"
    fi
    CURRENT_VERSION=$(cat "$VERSION_FILE")
}

# Function to increment version
increment_version() {
    local version=$1
    local increment_type=$2
    IFS='.' read -r -a version_parts <<< "$version"

    case "$increment_type" in
        major)
            version_parts[0]=$((version_parts[0] + 1))
            version_parts[1]=0
            version_parts[2]=0
            ;;
        minor)
            version_parts[1]=$((version_parts[1] + 1))
            version_parts[2]=0
            ;;
        patch)
            version_parts[2]=$((version_parts[2] + 1))
            ;;
        *)
            handle_error "Unknown increment type: $increment_type"
            ;;
    esac

    NEW_VERSION="${version_parts[0]}.${version_parts[1]}.${version_parts[2]}"
}

# Function to create a Git tag
create_tag() {
    local version=$1
    local prod=$2
    if [ "$prod" = true ]; then
        TAG="v$version"
    else
        TAG="v$version-staging"
    fi

    # Create the Git tag
    git tag -a "$TAG" -m "Tagging version $TAG"
    if [ $? -ne 0 ]; then
        handle_error "Failed to create Git tag."
    fi

    # Push the tag to the remote
    git push origin "$TAG"
    if [ $? -ne 0 ]; then
        handle_error "Failed to push Git tag to remote."
    fi

    echo "[INFO] Created and pushed tag: $TAG"
}

# Main script execution
main() {
    # Read the current version
    read_version

    # Increment the version
    increment_version "$CURRENT_VERSION" "$INCREMENT"

    # Save the new version to the version file
    echo "$NEW_VERSION" > "$VERSION_FILE"
    echo "[INFO] New version: $NEW_VERSION"

    # Create the Git tag based on production or staging
    create_tag "$NEW_VERSION" "$PROD"

    echo "[INFO] Versioning complete."
}

# Parse command-line arguments
while [[ "$#" -gt 0 ]]; do
    case $1 in
        --prod) PROD=true ;;  # Use production mode
        --major) INCREMENT="major" ;;  # Increment major version
        --minor) INCREMENT="minor" ;;  # Increment minor version
        -*) echo "[ERROR] Unknown parameter passed: $1"; exit 1 ;;
    esac
    shift
done

# Start the main script
main


