# fail if one of the subcommands fails
set -e

# build the editor
cd editor
npm run build
cd ..
# copy built editor files to the public folder
rm -rf static/editor-assets
mkdir static/editor-assets
cp editor/dist/editor-assets/* static/editor-assets/. -r

# Build the landing page
# npm run build-images
hugo
# Build netlify redirects
./buildRedirects.sh