Rails.application.routes.draw do
  devise_for :users, controllers: { sessions: 'users/sessions', registrations: 'users/registrations' }
  root 'reports#dashboard'
  resources :reports, except: [:show]
  get 'reports/:id/delete', to: 'reports#delete', as: 'delete_report'
  get '/community_dashboard', to: 'reports#community_dashboard'
  get '/admin_dashboard', to: 'reports#admin_dashboard'
end
