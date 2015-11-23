module Users
  class RegistrationsController < Devise::RegistrationsController
    layout false, except: [:edit, :update]

    def account_update_params
      params.require(:user).permit(:name, :avatar,
                                :avatar_cache, :email,
                                :password, :password_confirmation,
                                :facebook_image_url)
    end

    protected

    def update_resource(resource, params)
      resource.update_without_password(params)
    end
  end
end
