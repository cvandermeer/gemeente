Rails.application.routes.draw do
  devise_for :users, controllers: { sessions: 'users/sessions', registrations: 'users/registrations' }
  root 'reports#index'
  resources :communities, only: :index
  resources :reports do
    get :info_window, on: :member
    get :delete, on: :member
  end
end
