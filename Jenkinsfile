pipeline {
    agent any
    // options {
    //     disableConcurrentBuilds()
    //     timeout(time: 10, unit: 'MINUTES')
    //     timestamps()
    // }
    tools { nodejs 'NodeJs_14_lts' }
    environment {
        project_name = 'node-server-refer'
        // build_dir = ''
        source_dir = '/docker_root/jenkins/workspace'
        target_dir = '/www/wwwroot'
    }
    stages {
        stage('Preparation') {
            steps {
                sh 'node -v'
                sh 'npm -v'
                sh 'npm config set registry https://registry.npm.taobao.org/'
                sh 'npm config get registry'
                sh 'npm i'
            }
        }
        // stage('Deploy') {
        //     steps {
        //         script {
        //             echo "current branch: $BRANCH_NAME"
        //             echo "BUILD_NUMBER: $BUILD_NUMBER"
        //             echo "project_name: ${project_name}"
        //             if (BRANCH_NAME.equals("dev") || BRANCH_NAME.equals("test") || BRANCH_NAME.equals("master")) {
        //                 sshPublisher(
        //                     continueOnError: false, failOnError: true,
        //                     publishers: [
        //                         sshPublisherDesc(
        //                             configName: "wont_server",
        //                             verbose: true,
        //                             transfers: [
        //                                 sshTransfer(
        //                                     sourceFiles: "${source_dir}/${project_name}_$BRANCH_NAME/**/*", // dist 为构建结果文件夹
        //                                     // removePrefix: "${build_dir}", // 部署后 URL path 不需要 ‘dist’ 路径因此去掉
        //                                     remoteDirectory: "${source_dir}/${project_name}_$BRANCH_NAME",
        //                                     execCommand: "cd $source_dir/${project_name}_$BRANCH_NAME && sh ensureDir.sh $source_dir/${project_name}_$BRANCH_NAME $project_name $BRANCH_NAME $target_dir",
        //                                 )
        //                             ]
        //                         )
        //                     ]
        //                 )
        //             }
        //         }
        //     }
        // }
        stage('server') {
            steps {
                script {
                    echo "current branch: $BRANCH_NAME"
                    sh "pwd"
                    // sh "cd $target_dir/$project_name/$branch_name/"
                    sh 'npm run dev'
                }
            }
        }
    }
    post {
        failure {
            emailext(
                subject: "Jenkins build is ${currentBuild.result}: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                mimeType: "text/html",
                body: """<p>Jenkins build is ${currentBuild.result}: ${env.JOB_NAME} #${env.BUILD_NUMBER}:</p>
                        <p>Check console output at <a href="${env.BUILD_URL}console">${env.JOB_NAME} #${env.BUILD_NUMBER}</a></p>""",
                recipientProviders: [[$class: 'CulpritsRecipientProvider'],
                                    [$class: 'DevelopersRecipientProvider'],
                                    [$class: 'RequesterRecipientProvider']]
            )
        }
    }
}
