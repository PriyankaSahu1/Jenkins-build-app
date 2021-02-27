node {
    def app

    stage('Clone repository') {
      

        checkout scm
    }

    stage('Build image') {
  
       app = docker.build("priyanka101/jenkinsapp")
    }

    stage('Test image') {
  

        app.inside {
            sh 'echo "Tests passed"'
        }
    }

    stage('Push image') {
        
        docker.withRegistry('https://registry.hub.docker.com', 'docker-hub') {
            app.push("${env.BUILD_NUMBER}")
            app.push("latest")
        }
    }
    stage('Deploy'){

        //sh "ansible-playbook deploytohost.yml"
       ansiblePlaybook credentialsId: 'ansible-privateKey', disableHostKeyChecking: true, installation: 'ansible', inventory: 'dev.inv', playbook: 'deploytohost.yml'
    }
    stage('Complete'){

        sh "echo 'Build Successful'"
    }
}
