class MessagesController < ApplicationController
  layout false

  def new
    @message = Message.new
  end

  def create
  end
end
