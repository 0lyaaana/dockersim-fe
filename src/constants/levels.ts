export interface Level {
  name: string
  description: string
  commands: string[]
}

export const LEVELS: Level[] = [
  {
    name: '초급',
    description: '기본적인 도커 명령어를 학습합니다.',
    commands: [
      'docker run',
      'docker ps',
      'docker stop',
      'docker rm',
      'docker images',
      'docker pull'
    ]
  },
  {
    name: '중급',
    description: '도커 네트워크와 볼륨을 다루는 명령어를 학습합니다.',
    commands: [
      'docker network create',
      'docker network ls',
      'docker volume create',
      'docker volume ls'
    ]
  },
  {
    name: '고급',
    description: '도커 컴포즈와 고급 기능을 다루는 명령어를 학습합니다.',
    commands: [
      'docker-compose up',
      'docker-compose down',
      'docker-compose build',
      'docker-compose ps'
    ]
  }
] 