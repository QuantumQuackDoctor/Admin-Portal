pipeline {
    agent any
    parameters {
        string(name: 'RouteName', description: 'name for cloudfront distribution alias', defaultValue: params.RouteName ?: 'admin')
        string(name: 'BaseStackName', description: 'name of base infrastructure stack', defaultValue: params.BaseStackName ?: 'BaseInfrastructure')
        string(name: 'BucketName', description: 'name of bucket to upload to include environment postfix', defaultValue: params.BucketName ?: '')
        string(name: 'Environment', defaultValue: params.Environment ?: 'dev')
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
                s3Delete(bucket:"${params.BucketName}", path:'')
                s3Upload(file: 'build', bucket:"${params.BucketName}")
            }
        }
        stage('Create Distribution'){
            steps {
                sh "aws cloudformation deploy --stack-name AdminPortalStack --region ${AWS_REGION} --template-file adminPortal.template --parameter-overrides RouteName=${params.RouteName} Environment=${params.Environment}  --capabilities CAPABILITY_NAMED_IAM --no-fail-on-empty-changeset"
            }
        }
    }
}