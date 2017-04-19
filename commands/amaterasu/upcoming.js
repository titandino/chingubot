angular.module('DpsInject').controller('RaidController', ['$scope', 'moment', 'RaidFactory', '$document', ($scope, moment, RaidFactory, $document) => {
  $scope.schedule;

  $scope.user = {};
  $scope.characters = [];

  $scope.nextRaid;
  $scope.myNextRaid;

  $scope.userRaids = [];

  RaidFactory.getWeekSchedule().get().$promise
  .then((result) => {
    if (result.success) {
      $scope.schedule = { days: {}};
      $scope.schedule.updated = result.updated;
      $scope.user = result.user;
      $scope.characters = result.characters;
      angular.forEach(result.raids, (raid, raidNum) => {
        var dayOfWeek = $scope.getEstTime(raid.date).valueOf(); //$scope.getLocalTime(raid.date).valueOf();
        if (!$scope.schedule.days[dayOfWeek]) {
          $scope.schedule.days[dayOfWeek] = {
            raids: []
          }
        }
        var r = {
          datetime: $scope.getLocalTime(raid.date, raid.time),
          estDate: raid.date, // don't use
          estTime: raid.time, // don't use
          num: raid.num,
          rows: []
        };
        for(var rowNum in _.range(0, raid.dps.length)) {
          var row = [];
          var character = {
            datetime: $scope.getLocalTime(raid.date, raid.time)
          };
          if (raid.tank[rowNum]) {
            row.push(raid.tank[rowNum]);
            if (raid.tank[rowNum].color != '') {
              character.character = raid.tank[rowNum];
              if (!$scope.myNextRaid && r.datetime > moment()) {
                $scope.myNextRaid = character;
              }
            }
          } else row.push('');
          if (raid.dps[rowNum]) {
            row.push(raid.dps[rowNum]);
            if (raid.dps[rowNum].color != '') {
              character.character = raid.dps[rowNum];
              if (!$scope.myNextRaid && r.datetime > moment()) {
                $scope.myNextRaid = character;
              }
            }
          }
          else row.push('');
          if (raid.priest[rowNum]) {
            row.push(raid.priest[rowNum]);
            if (raid.priest[rowNum].color != '') {
              character.character = raid.priest[rowNum];
              if (!$scope.myNextRaid && r.datetime > moment()) {
                $scope.myNextRaid = character;
              }
            }
          }
          else row.push('');
          if (raid.mystic[rowNum]) {
            row.push(raid.mystic[rowNum]); 
            if (raid.mystic[rowNum].color != '') {
              character.character = raid.mystic[rowNum];
              if (!$scope.myNextRaid && r.datetime > moment()) {
                $scope.myNextRaid = character;
              }
            }
          }
          if (character.character) {
            $scope.userRaids.push(character);
          }
          else row.push('');
          r.rows.push(row);
        }
        if (!$scope.nextRaid && r.datetime > moment()) {
          $scope.nextRaid = r;
        }
        $scope.schedule.days[dayOfWeek].raids.push(r);
        $scope.schedule.days[dayOfWeek].date = $scope.getLocalTime(raid.date);
      });
      $scope.userRaids.sort((a, b) => {
        return a.datetime.valueOf() - b.datetime.valueOf();
      });
    }
  }, (err) => {
    console.log(err);
  });

  $scope.getEstTime = function(dateStr, timeStr) {
    return moment.tz(dateStr + ' ' + timeStr, 'M/D h A z', 'America/New_York');
  }

  $scope.getLocalTime = function(dateStr, timeStr) {
    return $scope.getEstTime(dateStr, timeStr).tz(moment.tz.guess());
  }

  $scope.scrollToMyNextRaid = function() {
    
  }

  function getRaidImage(raid) {
    RaidFactory.getRaidImage().get({
      num: n
    }).$promise
    .then((result) => {
      if (result.success) {
        raid.image = result.image;
      }
    });
  }
}]);
