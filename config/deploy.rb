lock '3.2.1'

set :application, 'gemeente'
set :repo_url, 'git@github.com:cvandermeer/gemeente.git'
set :deploy_to, '/u/apps/gemeente_production'
set :ssh_options, forward_agent: true
set :pty, false
set :linked_files, %w(config/database.yml .rbenv-vars .ruby-version)
set :linked_dirs, %w(log tmp/pids tmp/cache tmp/sockets vendor/bundle public/system)
set :default_env, path: '/opt/rbenv/shims:$PATH'
set :keep_releases, 5
set :linked_dirs, fetch(:linked_dirs) + %w(public/system public/uploads)
set :sidekiq_config, -> { File.join(shared_path, 'config', 'sidekiq.yml') }
namespace :deploy do
  task :symlink_uploads do
    run "ln -nfs #{shared_path}/uploads  #{release_path}/public/uploads"
  end
  desc 'Restart application'
  task :restart do
    on roles(:app), in: :sequence, wait: 5 do
      execute :touch, release_path.join('tmp/restart.txt')
    end
  end
  after :publishing, :restart
end
