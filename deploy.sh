#!/usr/bin/expect

user=$1
ip=$2
password=$3

pwd
ls -a

if [ -d "./dist" ]; then
    pwd
    ls -a
    set user ${user}
    set ip ${ip}
    set password ${password}
    set timeout 1200
    spawn scp -r ./dist ${user}@${ip}:/server_root/node_server_refer
    expect "password"
    send "${password}\r"
    interact
    fi


# else
#     cd $project_name
#     if [ ! -d $branch_name ]; then
#         mkdir $branch_name
#         cp -r $source_dir/* $target_dir/$project_name/$branch_name
#     else
#         cp -r $source_dir/* $target_dir/$project_name/$branch_name
#     fi
# fi
