Rails.application.routes.draw do
  devise_for :users, controllers: { sessions: 'users/sessions', registrations: 'users/registrations' }
  root 'reports#index'
  resources :reports, except: [:show, :index]
  get 'reports/:id/delete', to: 'reports#delete', as: 'delete_report'
end
