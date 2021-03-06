set :application, 'gemeente'
set :repo_url, 'git@github.com:cvandermeer/gemeente.git'
set :deploy_to, '/home/deploy/gemeente'
set :linked_files, %w(config/database.yml)
set :linked_dirs, %w(bin log tmp/pids tmp/cache tmp/sockets vendor/bundle public/system)

namespace :deploy do
  desc 'Restart application'
  'deploy:migrate'
  task :restart do
    on roles(:app), in: :sequence, wait: 5 do
      execute :touch, release_path.join('tmp/restart.txt')
    end
  end
  after :publishing, 'deploy:restart'
  after :finishing, 'deploy:cleanup'
end

after :deploy, 'deploy:migrate'
after :deploy, 'sidekiq:restart'
