class CategoriesController < ApplicationController
  before_action :authenticate_admin!
  before_action :set_category, only: [:edit, :update, :destroy]

  def index
    @categories = Category.all
    @category = Category.new
  end

  def create
    @category = Category.new(category_params)
    if @category.save
      redirect_to categories_path, notice: "De categorie #{@category.title} is aangemaakt"
    else
      redirect_to categories_path, alert: 'De categorie kon niet worden opgeslagen'
    end
  end

  def edit
  end

  def update
    if @category.update(category_params)
      redirect_to categories_path, notice: "De categorie #{@category.title} is aangepast"
    else
      render 'edit', alert: 'De categorie kon niet worden opgeslagen'
    end
  end

  def destroy
    redirect_to categories_path, notice: "De categorie #{@category.title} is verwijdert" if @category.destroy
  end

  private

  def set_category
    @category = Category.find(params[:id])
  end

  def category_params
    params.require(:category).permit(:title, :icon_name)
  end
end
