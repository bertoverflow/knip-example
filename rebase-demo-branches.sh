#!/bin/zsh

# Fetch latest changes
git fetch --all

git checkout main
git pull

echo "Rebasing demo onto main..."
git checkout demo || { echo "Failed to checkout demo"; exit 1 }
git rebase main || { echo "Rebase failed for demo. Resolve conflicts and continue manually."; exit 1 }
git push --force-with-lease || { echo "Push failed for demo"; exit 1 }
echo "demo rebased and pushed."

echo "Rebasing short-version onto main..."
git checkout short-version || { echo "Failed to checkout short-version"; exit 1 }
git rebase main || { echo "Rebase failed for short-version. Resolve conflicts and continue manually."; exit 1 }
git push --force-with-lease || { echo "Push failed for short-version"; exit 1 }
echo "short-version rebased and pushed."

echo "Rebasing short-version-demo onto short-version..."
git checkout short-version-demo || { echo "Failed to checkout short-version-demo"; exit 1 }
git rebase short-version || { echo "Rebase failed for short-version-demo. Resolve conflicts and continue manually."; exit 1 }
git push --force-with-lease || { echo "Push failed for short-version-demo"; exit 1 }
echo "short-version-demo rebased and pushed."

git checkout main

echo "All done."
