#!/bin/bash -e

token_file="$(dirname $0)/../token.json"

script_path=$(curl -sSL https://music.apple.com/ | grep -o '[^"]*index.[a-z0-9]*.js' | head -n 1)

developer_token_quoted=$(curl -sSL "https://music.apple.com$script_path" | grep -o '[^=]*[^,]*x-apple-jingle-correlation-key' | grep -o '"[^"]*"' | head -n 1)

echo "{ \"developerToken\": $developer_token_quoted }" > $token_file
