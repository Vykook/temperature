#!/usr/bin/env perl
use warnings;
use strict;

open(COM, "+<", "/dev/ttyACM0")|| die "Sakra!";

while(<COM>){
	next unless m/^\d{2}\.\d{2}\|\d{2}\.\d{2}/;

	my @data = split /\|/;
	system("ssh core\@vykook.eu \'docker exec -t mymongo mongo home --eval \"printjson(db.temperature.insert({humidity: $data[0], temperature: $data[1], date: new Date()}))\"\'");

	last;
}
