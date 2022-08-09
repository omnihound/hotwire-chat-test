class MessagesRefreshController < ApplicationController
    before_action :set_room, only: %i[ index ]
  
    def index
        @messages = @room.messages

        respond_to do |format|
          format.turbo_stream
        end
    end

    def new
      @message = @room.messages.new
    end
  
    def create
      @message = @room.messages.create!(message_params)
  
      respond_to do |format|
        format.turbo_stream
        format.html { redirect_to @room }
      end
    end
  
    private
    def set_room
      @room = Room.find(params[:room_id])
    end
  end