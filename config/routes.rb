Rails.application.routes.draw do
  root 'events#index'
  resources :events, except: [:show, :index, :destroy]
end
