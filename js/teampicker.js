    var teampickerService = function(){};
    teampickerService.prototype = {
        renderOptions: function(){            
            var playerSelectors = $('.player-selector')
            this.playersCount = playerSelectors.length;
            for(var i=0 ; i <  this.playersCount ; i++){
                var id = $(playerSelectors[i]).attr('id')
                    $("#"+id).select2({
                    placeholder: "Select player",
                    allowClear: true,
                    data: this.players
                });
            }
        },
        players: [
            { id: 0, text: 'Ali' }, 
            { id: 1, text: 'Ameya' }, 
            { id: 2, text: 'Mohammed' }, 
            { id: 3, text: 'Nikhil' }, 
            { id: 4, text: 'Pranav' },
            { id: 5, text: 'Shamik' }
        ],
        teams: {
            Team1: [],
            Team2: [],
            Team3: []
        },
        games:[],
        resetTeams: function(){
            for(var team in this.teams){
                this.teams[team] = [];
            }
        },
        drawCount: 0,
        drawTeams: function(){
            this.drawCount ++;
            var result = [];
            this.resetTeams();
            for(var i=1 ; i <= this.playersCount; i++){
                var id = 'player-selector'+i;
                if($("#"+id).select2('data')){
                    var player = $("#"+id).select2('data').text;
                    result.push(player);  
                }
                
            }
            result = this.shufflePlayers(result);
            for(var j=0 ; j < this.playersCount; j++){
                if(j ==0 || j==1){
                    this.teams.Team1.push(result[j]);
                }
                if(j ==2 || j==3){
                    this.teams.Team2.push(result[j]);
                }
                if(j ==4 || j==5){
                    this.teams.Team3.push(result[j]);
                }
            }
        },
        shufflePlayers: function(array) {
          var currentIndex = array.length, temporaryValue, randomIndex ;

          // While there remain elements to shuffle...
          while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
          }
          return array;
        },
        renderTeams: function(){
            $('.teams').html(' ')
            var html = [];
            for (var team in this.teams){
                html.push( '<div class="col-lg-3 team1"><h4 class="team-name">'+team+'</h4>'+this.teams[team].join(' + ')+' </div>');
            }
            $('.teams').append(html.join(' ')).hide();
            $('.teams').slideDown(500);
            this.showCount();
        },
        showCount: function(){
            $('.count-content').show();
            $('.draw-count').text(this.drawCount);
        },
        clearTeamsView: function(){
            $('.team-selector').html(' ');
            $('.count-content').hide();
        },
        renderDrawGames: function(){
            $('.games').show(200);
        },
        pickRandomTeam: function(obj) {
            var result;
            var count = 0;
            for (var prop in obj)
                if (Math.random() < 1/++count)
                   result = prop;
            return result;
        },
        renderGames: function(){
            var html = []; 
            for (var loop=0; loop< this.games.length; loop++){
                html.push( '<div class="col-lg-3 team1"><h4 class="game-name"></h4>'+this.games[loop]+' </div>');
            }
            $('.games').append('<div class="games-title"><h3>Lets Play!</h3></div>');
            $('.games').append(html.join(' '));
            
        },
        clearGamesView : function(){
            $('.draw-games').hide();
        },
        drawGames: function(){
            this.games = [];
            this.clearGamesView();
            var team1 = this.pickRandomTeam(this.teams);

            for(var team in this.teams){
                if(team !=team1){
                    var game = team+' vs '+team1;
                    this.games.push(game);
                }
            }
            this.renderGames();
        }

    };
    
    var teamPicker = new teampickerService();
    teamPicker.renderOptions();

    $('.draw-teams').on('click',function(){
        teamPicker.drawTeams();
        teamPicker.renderTeams();
    });

    $('.draw-games-nav').on('click',function(){
        teamPicker.clearTeamsView();
        teamPicker.renderDrawGames();
    });
    $('.draw-games').on('click',function(){
         teamPicker.drawGames();
    });
   

    
