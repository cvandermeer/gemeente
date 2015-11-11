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
    get :report_index, on: :member
    get :info_window, on: :member
    get :delete, on: :member
    get :markers, on: :collection
  end

  ### ZIPCODES ###
  get 'search_streets', to: 'zipcodes#search_streets', as: 'search_streets'
  get 'search_towns', to: 'zipcodes#search_towns', as: 'search_towns'

  ### SIDEKIQ ####
  authenticate :user do
    mount Sidekiq::Web => '/sidekiq'
  end
end
