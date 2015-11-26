require 'sidekiq/web'

Rails.application.routes.draw do
  root 'reports#index'

  ### COMMUNITIES ###
  resources :communities, only: [:index, :show] do
    get :news, on: :member
    get :community_list, on: :collection
  end

  ### COMMUNITY SUBSCRIPTIONS ###
  resources :community_subscriptions, only: [:create, :destroy] do
    get :delete, on: :member
  end

  ### MESSAGES ###
  resources :messages, except: [:edit, :update, :destroy]

  ### NEWSLETTERS ###
  resources :newsletters, except: [:edit, :update, :destroy]

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
  resources :users, only: [:index]
  get 'user_notifications', to: 'users#user_notifications', as: 'user_notifications'
  get 'profile', to: 'users#profile', as: 'profile'
  get 'user_reports', to: 'users#user_reports', as: 'user_reports'

  ### ZIPCODES ###
  get 'search_streets', to: 'zipcodes#search_streets', as: 'search_streets'
  get 'search_towns', to: 'zipcodes#search_towns', as: 'search_towns'
end
