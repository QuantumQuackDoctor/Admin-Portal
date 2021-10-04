pipline {
    agent any
    parameters {
        string(name: 'RouteName', description: 'name for cloudfront distribution alias')
        string(name: 'BaseStackName' description: 'name of base infrastructure stack')
    }
    tools {
        nodejs "Node 14"
    }
    stages {
        stage('Install Dependencies'){
            steps {
                sh 'npm install'
            }
        }
        stage('Test'){
            steps {
                sh 'npm run test -- --bail --ci'
            }
        }
        stage('Build'){
            steps {
                sh 'npm run build'
            }
        }
        stage('Upload S3'){
            steps {
                s3Delete(bucket:'admin-portal', path:'')
                s3Upload(file: 'build', bucket:'admin-portal')
            }
        }
        stage('Create Distribution'){
            steps {
                sh 'aws cloudformation deploy --stack-name AdminPortalStack --region ${AWS_REGION} --template-file adminPortal.template --parameter-overrides RouteName=${params.RouteName} BaseStackName=${params.BaseStackName} --capabilities CAPABILITY-NAMED-IAM'
            }
        }
    }
}