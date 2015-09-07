task :q do
  sh('bundle exec rake')
  sh('bundle exec rubocop')
  sh('bundle exec rails_best_practices')
end
