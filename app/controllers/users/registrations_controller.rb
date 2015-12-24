module Users
  class RegistrationsController < Devise::RegistrationsController
    layout false, except: [:edit, :update]

    def account_update_params
      params.require(:user).permit(:name, :avatar, :email, :get_mail,
                                   :street, :housenumber, :town,
                                   :password, :password_confirmation)
    end

    def sign_up_params
      params.require(:user).permit(:name, :email,
                                   :street, :housenumber, :town,
                                   :password, :password_confirmation)
    end

    protected

    def update_resource(resource, params)
      resource.update_without_password(params)
    end
    
    def after_update_path_for(resource)
      edit_user_registration_path(resource)
    end
  end
end
