from resources.render_chaffers import render_chaffers


# Create your views here.
def view(request, game_id):
    """
    Show the game with the given ID
    """
    return render_chaffers(
        request,
        'games/view.html',
        {'game_id': game_id}
    )
