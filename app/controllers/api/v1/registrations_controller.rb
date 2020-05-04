class Api::V1::RegistrationsController < Devise::RegistrationsController
  before_action :configure_permitted_params
  respond_to :json

  def create
    user = User.create(username: params[:username], 
      email: params[:email], 
      password: params[:password],
      password_confirmation: params[:password_confirmation])

    if user.save
      render json: {status: "SUCCESS", 
                    message: "Created new user account",
                    data: user }, status: :ok
    else
      render json: {status: "ERROR", 
                       message: "Could not create user account", 
                       data: user.errors},
                       status: :unprocessable_entity
    end
  end

  private

  def signup_params
    params.require(:user).permit(:username, :email, :password, :password_confirmation)
  end

  protected

  def configure_permitted_params
    devise_parameter_sanitizer.permit(:sign_up, keys: [:username])
  end
end
