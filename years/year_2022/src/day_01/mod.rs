use std::{fs, iter::Map, str::Split};

pub fn run_day_01() {
    let input = read_input();
    let groups = sum_groups(&input);
    let result = get_max(&groups);
    let top3_sum = get_top3_sum(&groups);

    println!(
        "
# Result 1
    {}
    ",
        result
    );

    println!(
        "
# Result 2
    {}
    ",
        top3_sum
    );
}

fn sum_groups(input: &String) -> Vec<u32> {
    let result: Vec<u32> = input
        .split("\n\n")
        .map(|load| {
            load.lines()
                .map(|item| item.parse::<u32>().unwrap())
                .sum::<u32>()
        })
        .collect();

    result
}

fn get_max(groups: &Vec<u32>) -> u32 {
    *groups.iter().max().unwrap()
}

fn get_top3_sum(groups: &Vec<u32>) -> u32 {
    let mut sorted: Vec<u32> = groups.clone();
    sorted.sort_by(|a, b| b.cmp(a));
    let sum = sorted.iter().take(3).sum();
    sum
}

fn read_input() -> String {
    let filename = "./src/year_2022/day_01/input.txt";

    // Read the contents of the file into a string
    let contents = fs::read_to_string(filename).expect("Failed to read Day 01 input file");
    return contents;
}

#[cfg(test)]
mod test {
    use std::io::Write;

    use super::*;

    const INPUT: &str = "1000
2000
3000

4000

5000
6000

7000
8000
9000

10000";

    #[test]
    fn example_works() {
        let groups = sum_groups(&INPUT.to_string());
        let result = get_max(&groups);
        let top3_sum = get_top3_sum(&groups);
        assert_eq!(result, 24000);
        assert_eq!(top3_sum, 45000);
    }

    #[test]
    fn part_1_works() {
        let input = read_input();
        let groups = sum_groups(&input);
        let result = get_max(&groups);
        let top3_sum = get_top3_sum(&groups);
        assert_eq!(result, 70369);
        assert_eq!(top3_sum, 203002);
    }
}
