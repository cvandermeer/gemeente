Rails.application.routes.draw do
  devise_for :users, controllers: { sessions: 'users/sessions', registrations: 'users/registrations' }
  root 'reports#index'
  resources :communities, only: :index
  resources :reports do
    get :delete, on: :member
    get :community_dashboard, on: :collection
    get :admin_dashboard, on: :collection
  end
end
