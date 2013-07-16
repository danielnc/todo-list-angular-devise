class Api::BaseController < ApplicationController
  layout false
  respond_to :json

  protect_from_forgery with: :null_session
end