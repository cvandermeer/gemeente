require 'sidekiq/web'

Rails.application.routes.draw do
  root 'reports#index'

  ### ADMIN PANEL ###
  get 'admin_panel', to: 'static_pages#admin_panel'

  ### COMMUNITIES ###
  resources :communities, only: [:index, :show] do
    get :news, on: :member
    get :community_list, on: :collection
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
  get 'profile', to: 'users#profile', as: 'profile'

  ### ZIPCODES ###
  get 'search_streets', to: 'zipcodes#search_streets', as: 'search_streets'
  get 'search_towns', to: 'zipcodes#search_towns', as: 'search_towns'
end
