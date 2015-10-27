class ZipcodesController < ApplicationController
  def search_streets
    render json: Zipcode.search_streets(params[:search])
  end

  def search_towns
    render json: Zipcode.search_towns(params[:search])
  end
end
