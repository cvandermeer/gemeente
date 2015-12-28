module Users
  class ConfirmationsController < Devise::ConfirmationsController
    protected

    def after_confirmation_path_for(_, _)
      root_path
    end
  end
end
