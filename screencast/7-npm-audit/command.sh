#!/bin/bash
npm audit | grep -i "^# run" | cut -d " " -f "3-8"
