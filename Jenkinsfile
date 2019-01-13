pipeline {
  agent any
  stages {
    stage('Build') {
      steps {
        sh 'npm install'
        sh 'node index.js &'
      }
    }
    stage('Deploy') {
      steps {
        sh 'mkdir -p /home/jorodriguez/meritoki/dailybread/'
        sh 'sudo rm -rf app'
        sh 'sudo git clone -b dev https://github.com/meritoki/app.git'
        sh 'cd app'
        sh 'git branch -a'
        sh 'git status'
        sh 'docker stop app || true && docker rm app || true'
        sh 'docker rmi $(docker images |grep \'dailybread/app\') || true'
        sh 'docker build -t dailybread/app .'
        sh 'sudo docker run --network host -dlt --restart unless-stopped --name app -p 80:80 dailybread/app'
      }
    }
  }
}
