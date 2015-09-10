Rails.application.routes.draw do
  root 'application#redirect_to_events'
  resources :events, only: [:show, :new, :create, :index]
end
