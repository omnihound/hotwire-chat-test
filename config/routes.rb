Rails.application.routes.draw do
  resources :rooms do
    resources :messages
  end

  get '/rooms/:room_id/messages_refresh' => "messages_refresh#index"
  get '/service-worker.js' => "service_worker#service_worker", defaults: { format: 'js' }
  get '/manifest.json' => "service_worker#manifest", defaults: { format: 'json' }
end
