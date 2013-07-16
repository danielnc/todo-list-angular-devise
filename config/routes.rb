TodoList::Application.routes.draw do
  devise_for :users, :skip => [:sessions]
  as :user do
    get '/login' => 'devise/sessions#new', :as => :new_user_session
    post '/login' => 'devise/sessions#create', :as => :user_session
    delete '/logout' => 'devise/sessions#destroy', :as => :destroy_user_session
    get '/sign_up' => 'devise/registrations#new'
  end

  namespace :api, defaults: {format: :json} do
    resources :todos
    post '/auth_token' => 'sessions#create'
  end

  get "/todos", to: "home#index"
  get "/todos/*other", to: "home#index"

  root to: "home#index"
end
