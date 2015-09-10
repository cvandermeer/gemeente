Rails.application.routes.draw do
  root 'events#index'
  resources :events, only: [:show, :new, :create]
end
