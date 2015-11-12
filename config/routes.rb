require 'sidekiq/web'

Rails.application.routes.draw do
  root 'reports#index'

  ### COMMUNITIES ###
  resources :communities, only: [:index, :show]

  ### MESSAGES ###
  resources :messages, except: [:edit, :update, :destroy]

  ### REPORTS ###
  resources :reports do
    member do
      get :report_index
      get :info_window
      get :delete
    end
    get :markers, on: :collection
  end

  ### SIDEKIQ ####
  authenticate :user do
    mount Sidekiq::Web => '/sidekiq'
  end

  ### USERS ###
  devise_for :users, controllers: { sessions: 'users/sessions', registrations: 'users/registrations' }
  resources :users, only: [:show, :index]

  ### ZIPCODES ###
  get 'search_streets', to: 'zipcodes#search_streets', as: 'search_streets'
  get 'search_towns', to: 'zipcodes#search_towns', as: 'search_towns'
end
