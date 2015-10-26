require 'sidekiq/web'

Rails.application.routes.draw do
  root 'reports#index'

  ### USERS ###
  devise_for :users, controllers: { sessions: 'users/sessions', registrations: 'users/registrations' }
  resources :users, only: [:show]

  ### COMMUNITIES ###
  resources :communities, only: [:index, :show]

  ### REPORTS ###
  resources :reports do
    get :info_window, on: :member
    get :delete, on: :member
  end

  ### SIDEKIQ ####
  authenticate :user do
    mount Sidekiq::Web => '/sidekiq'
  end
end
