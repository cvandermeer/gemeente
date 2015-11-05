set :stage, :production
server '37.139.13.37', port: 2752, user: 'deploy', roles: %w(web app)
