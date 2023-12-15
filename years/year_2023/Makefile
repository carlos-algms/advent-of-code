
YEAR="$(shell date +%Y)"
CUR_DAY="$(shell find . -name "day_*" -type d | wc -l | egrep -o '[0-9]+')"
NEXT_DAY=$(shell echo "$(CUR_DAY)+1" | bc)

day:
	cp -r template day_$(NEXT_DAY)
	cd day_$(NEXT_DAY); for f in day_XX*; do \
		to=`echo "$$f" | sed "s/XX/$(NEXT_DAY)/"`; \
		mv "$$f" "$$to"; \
		sed -i '' "s/XX/$(NEXT_DAY)/g" "$$to"; \
		sed -i '' "s/YY/1/g" "$$to"; \
	done

part2:
	cd day_$(CUR_DAY); for f in day_$(CUR_DAY)_part1*; do \
		to=`echo "$$f" | sed "s/part1/part2/g"`; \
		cp "$$f" "$$to"; \
		sed -i '' \
			-e "s/1'/2'/g" \
			-e "s/Part1/Part2/g" \
			"$$to"; \
	done
