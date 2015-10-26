class ZipcodesController < ApplicationController

  def search_streets
    @streets = Zipcode.search_streets(params[:search])
    render json: @streets
  end
end
