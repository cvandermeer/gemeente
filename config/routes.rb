Rails.application.routes.draw do
  devise_for :users, :controllers => { sessions: 'users/sessions' }
  root 'events#index'
  resources :events, except: [:show, :index]
  get 'events/:id/delete', to: 'events#delete', as: 'delete_event'
end
