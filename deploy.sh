
ip=$1
host=$2
password=$3

pwd
ls -a

if [ -d "./dist" ]; then
    pwd
    ls -a
    set user root
    set ip 49.234.7.238
    set password lk452123+
    scp -r ./dist /server_root/node_server_refer
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
