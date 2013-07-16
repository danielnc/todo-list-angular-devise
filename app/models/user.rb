class User < ActiveRecord::Base
  devise :database_authenticatable, :registerable, :rememberable, :validatable, :token_authenticatable

  before_save :ensure_authentication_token

  has_many :todos
end
