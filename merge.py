#!/usr/bin/env python3
"""
Simple script to merge SSI includes into a standalone HTML file.
Run this to generate index-standalone.html for local viewing.
"""

import re
import os

def merge_ssi(input_file, output_file):
    """Merge SSI includes into a single HTML file."""
    with open(input_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Pattern to match SSI includes
    pattern = r'<!--#include\s+file="([^"]+)"\s*-->'
    
    def replace_include(match):
        include_path = match.group(1)
        # Resolve relative to input file directory
        base_dir = os.path.dirname(input_file)
        full_path = os.path.join(base_dir, include_path)
        
        if os.path.exists(full_path):
            with open(full_path, 'r', encoding='utf-8') as inc_file:
                return inc_file.read()
        else:
            print(f"Warning: Could not find {full_path}")
            return match.group(0)
    
    merged_content = re.sub(pattern, replace_include, content)
    
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(merged_content)
    
    print(f"✓ Merged {input_file} -> {output_file}")

if __name__ == '__main__':
    merge_ssi('index.html', 'index-standalone.html')

