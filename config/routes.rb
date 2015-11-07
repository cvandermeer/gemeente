require 'sidekiq/web'

Rails.application.routes.draw do
  root 'reports#index'
  get 'set_markers', to: 'reports#set_markers'

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


  ### ZIPCODES ###
  get 'search_streets', to: 'zipcodes#search_streets', as: 'search_streets'
  get 'search_towns', to: 'zipcodes#search_towns', as: 'search_towns'

  ### SIDEKIQ ####
  authenticate :user do
    mount Sidekiq::Web => '/sidekiq'
  end
end
