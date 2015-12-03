require 'sidekiq/web'

Rails.application.routes.draw do
  root 'reports#index'

  ### ADMIN ###
  namespace :admin do
    get 'dashboard',    to: 'static_pages#dashboard'
    get 'users',        to: 'static_pages#users'
    get 'communities',  to: 'static_pages#communities'
  end

  ### COMMUNITY_ADMIN ###
  namespace :community_admin do
    get 'dashboard',      to: 'static_pages#dashboard'
    get 'reports',        to: 'static_pages#reports'
    get 'users',          to: 'static_pages#users'
    get 'location_news',  to: 'static_pages#location_news'
  end

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
  authenticate :user, -> (u) { u.admin? } do
    mount Sidekiq::Web => '/sidekiq'
  end

  ### USERS ###
  devise_for :users, controllers: { sessions: 'users/sessions', registrations: 'users/registrations' }

  resources :users, only: [:index] do
    get :notifications, on: :collection
    get :reports, on: :collection
    get :profile, on: :collection
  end

  post 'users/generate_user', to: 'users#generate_user'
  get 'users/new_admin_user', to: 'users#new_admin_user'
  post 'users/generate_community_admin_user', to: 'users#generate_community_admin_user'
  get 'users/new_community_admin_user', to: 'users#new_community_admin_user'

  ### USER_CATEGORIES ###
  resources :user_categories, only: :create

  ### ZIPCODES ###
  get 'search_streets', to: 'zipcodes#search_streets', as: 'search_streets'
  get 'search_towns', to: 'zipcodes#search_towns', as: 'search_towns'
end
