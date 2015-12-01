class UserCategoriesController < ApplicationController

  def create
    @user_category = UserCategory.new(user_category_params)
    if @user_category.save
      redirect_to community_admin_dashboard_path, notice: 'Nieuwe gebruiker categorie aangemaakt'
    else
      redirect_to community_admin_dashboard_path, alert: 'Er is iets misgegaan'
    end
  end

  private

  def user_category_params
    params.require(:user_category).permit(:user_id, :category_id)
  end
end
